import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  useForm,
  InputRow,
  InputLabel,
  Checkbox
} from "../../../../components/FormComponents";
import { useMutation } from "react-apollo";
import { Title, Body, BodySmall } from "../../../../components/Text";
import {
  Row,
  TeritaryButton,
  SmartButton,
  Col,
  SecondaryButton
} from "../../../../components/Blocks";
import ErrorMessageApollo from "../../../../components/common/ErrorMessageApollo";
import TagInput from "./TagInput";
import ImageUploader from "../../../../components/ImageInput";
import { ProgressBar } from "../../components/ProfileProgress";
import { UPLOAD_FILE } from "../../gql";
import { ADD_SOUND, UPDATE_SOUND } from "./gql";
import useSongMetadata from "./useSongMetadata";
import styled from "styled-components";
import GracefullImage from "../../../../components/GracefullImage";

const AddSound = props => {
  const { sound } = props;
  const [uploadProgress, setuploadProgress] = useState(sound ? 1 : null);
  const abortUpload = useRef();
  const [file, setFile] = useState();
  const [fileId, setFileId] = useState();

  const [upload, { loading: uploading, error: uploadError }] = useMutation(
    UPLOAD_FILE,
    {
      context: {
        fetchOptions: {
          useUpload: true,
          onProgress: e => {
            setuploadProgress(e.loaded / e.total);
          },
          onAbortPossible: abortHandler => {
            abortUpload.current = abortHandler;
          }
        }
      }
    }
  );

  const metadata = useSongMetadata({ file }) || {};

  const startUpload = async file => {
    setuploadProgress(0);
    setFile(file);
    const {
      data: { singleUpload }
    } = await upload({ variables: { file } });
    setFileId(singleUpload.id);
  };

  const showForm = sound || (uploadProgress !== null && metadata.common);
  return (
    <>
      {!showForm ? (
        <FileChooser onChange={startUpload} />
      ) : (
        <DataForm
          {...props}
          sound={{
            ...metadata.common,
            tags: metadata.common && metadata.common.genre,
            ...sound
          }}
          file={fileId}
          uploading={uploading}
          uploadingStatus={
            uploadError ? (
              <ErrorMessageApollo
                style={{ marginBottom: 0 }}
                error={uploadError}
              />
            ) : (
              <BodySmall style={{ marginBottom: 0 }}>
                {uploading && uploadProgress === 1
                  ? "Processing track..."
                  : uploading
                  ? "Uploading track..."
                  : "Track uploaded"}
              </BodySmall>
            )
          }
          uploadProgress={
            uploading ? Math.min(uploadProgress, 0.95) : uploadError ? 0 : 1
          }
          uploadError={uploadError}
        />
      )}
    </>
  );
};

const FileChooser = ({ onChange }) => (
  <Col middle>
    <Body>Upload in one of the following formats: </Body>
    <ImageUploader
      style={{
        background: "#31daff",
        color: "white",
        width: "250px",
        margin: "auto",
        marginTop: "24px"
      }}
      name="sound"
      accept="audio/*"
      onSave={onChange}
    >
      Choose file
    </ImageUploader>
    <Row style={{ margin: "6px 0 24px 0" }}>
      <span style={{ marginRight: "24px" }}>
        <Checkbox label={"Add to SoundCloud"} />
      </span>
      <Checkbox label={"Add to Mixcloud"} />
    </Row>
    <BodySmall style={{ textAlign: "center", maxWidth: "500px" }}>
      By uploading, you confirm that your sounds comply with our Terms of Use
      and you don't infringe anyone else's rights.
    </BodySmall>
  </Col>
);

const DataForm = ({
  formDisabled,
  uploadProgress,
  uploadingStatus,
  sound = {},
  file,
  onCancel,
  uploadError,
  uploading,
  details
}) => {
  const [form, setForm] = useState(sound);

  const { registerValidation, unregisterValidation, runValidations } = useForm(
    form
  );

  const onChange = key => val => {
    setForm(form => ({ ...form, [key]: val }));
  };

  const [mutate, { loading: submitting, error }] = useMutation(
    form.id ? UPDATE_SOUND : ADD_SOUND
  );

  const updateFile = () => {
    const refs = runValidations();
    if (refs.length === 0) {
      mutate({
        variables: { ...form, file }
      });
    }
  };

  const { title, tags, description, year, image, imageFile } = form || {};

  return (
    <form>
      <Title style={{ marginBottom: "39px" }}>Add sound</Title>
      {uploadingStatus}
      <ProgressBar progress={uploadProgress} />
      <Row style={{ marginTop: "30px" }}>
        <CoverPicture url={image ? image.path : null} imageFile={imageFile} />
        <Col>
          <InputRow>
            <Input
              label="Title"
              defaultValue={title}
              placeholder="Name your track"
              type="text"
              name="title"
              onSave={onChange("title")}
              disabled={formDisabled}
              validation={v => (!!v ? null : "Required")}
              registerValidation={registerValidation("title")}
              unregisterValidation={unregisterValidation("title")}
            />
            <Input
              label="Year"
              defaultValue={year || new Date().getFullYear()}
              placeholder="When was this released"
              type="text"
              name="year"
              onSave={onChange("year")}
              disabled={formDisabled}
            />
            <InputLabel>
              Tags
              <TagInput
                defaultValue={tags}
                onChange={onChange("tags")}
                placeholder="Add tags to describe the genre, style and mood"
              />
            </InputLabel>
            <Input
              defaultValue={description}
              type="text-area"
              label="Description"
              disabled={formDisabled}
              onSave={onChange("description")}
            />
          </InputRow>
        </Col>
      </Row>

      {uploadProgress !== null && (
        <Row right>
          <TeritaryButton type="button" onClick={onCancel}>
            Cancel
          </TeritaryButton>
          <SmartButton
            success={true}
            level="primary"
            disabled={uploading || uploadError}
            loading={submitting}
            onClick={updateFile}
            type="submit"
          >
            {uploading
              ? "Uploading..."
              : form.id
              ? "Update track"
              : "Add track"}
          </SmartButton>
        </Row>
      )}

      <ErrorMessageApollo error={details || error} />
    </form>
  );
};

const HiddenFileInput = styled.input.attrs({ type: "file" })`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const AlbumWrapper = styled.div`
  margin-right: 20px;
  margin-bottom: 24px;
  position: relative;
`;

const AlbumText = styled(SecondaryButton)`
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translate(-50%);
  pointer-events: none;
`;
const AlbumCover = styled(GracefullImage)`
  border-radius: 3px;
  width: 220px;
  min-width: 220px;
  height: 220px;

  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;
const CoverPicture = ({ url, onChange, imageFile }) => {
  const [src, setSrc] = useState(url);
  const input = useRef();

  const onFileChosen = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      onChange && onChange(file);
    }
  };

  // if image file
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();

      reader.onload = function(e) {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  debugger;

  return (
    <AlbumWrapper>
      <AlbumCover src={src} onClick={e => input.current.click(e)} />
      <HiddenFileInput ref={input} onChange={onFileChosen} accept="image/*" />

      <AlbumText>Change image</AlbumText>
    </AlbumWrapper>
  );
};

export default AddSound;
