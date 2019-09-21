import React, { useState } from "react";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";
import { Col } from "../../../../components/Blocks";
import { Body } from "../../../../components/Text";
import OfferForm from "../../components/blocks/OfferForm";
import Popup from "../../../../components/common/Popup";
import PayoutForm from "../../../../components/common/PayoutForm";

const Content = ({ gig, theEvent, me, showDecline }) => {
  const { userSettings, userMetadata } = me;

  const [payoutPopup, setPayoutPopup] = useState(false);

  return (
    <Col>
      <Popup showing={payoutPopup} onClickOutside={() => setPayoutPopup(false)}>
        <PayoutForm user={me} />
      </Popup>
      <OfferForm
        showPopup={() => setPayoutPopup(true)}
        profileCurrency={userSettings.currency}
        gig={gig}
        event={theEvent}
        payoutInfoValid={!!userMetadata.bankAccount}
        showDecline={showDecline}
      />
    </Col>
  );
};

const Offer = props => (
  <Col>
    <Body>
      Enter your price to play this gig. You can always update the offer until
      the organizer has confirmed.
    </Body>
    {props.loading ? <LoadingPlaceholder2 /> : <Content {...props} />}
  </Col>
);

export default Offer;
