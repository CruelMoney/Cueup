import React from "react";

const ErrorMessageApollo = ({ error, center }) => {
	let msgs = ["There was an error"];
	if (!error) return null;
	if (typeof error === "string") {
		msgs = [error];
	}

	const { graphQLErrors } = error;

	if (graphQLErrors && graphQLErrors.length > 0) {
		msgs = [];
		graphQLErrors.map((e, idx) => msgs.push(e.message));
	}

	return (
		<div className={"errors" + (center ? " center " : "")}>
			{msgs.map((m, idx) => {
				return <p key={idx}>{m}</p>;
			})}
		</div>
	);
};

export default ErrorMessageApollo;
