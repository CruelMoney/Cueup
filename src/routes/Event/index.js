import React from "react";
import { Helmet } from "react-helmet-async";
import { Route, Redirect, Switch } from "react-router-dom";
import content from "./content.json";
import requestFormContent from "../../components/common/RequestForm/content.json";
import modalContent from "../../components/common/modals/content.json";
import addTranslate from "../../components/higher-order/addTranslate";
import ScrollToTop from "../../components/common/ScrollToTop";
import Footer from "../../components/common/Footer";
import { Container, Row, Col } from "../../components/Blocks";
import { useQuery } from "react-apollo";
import EventProgress from "./components/blocks/EventProgress";
import { EVENT } from "./gql.js";
import EventHeader from "./components/blocks/EventHeader.js";
import Overview from "./routes/Overview";
import Requirements from "./routes/Requirements/index.js";
import Review from "./routes/Review/index.js";

const Index = ({ translate, match, location }) => {
	const { data = {}, loading } = useQuery(EVENT, {
		variables: {
			id: match.params.id,
			hash: match.params.hash
		}
	});

	const { event: theEvent } = data;

	if (!loading && !theEvent) {
		return <Redirect to={translate("routes./not-found")} />;
	}

	const title = theEvent ? theEvent.name : "Cueup | Event";
	const description = theEvent ? theEvent.description : null;

	if (theEvent) {
		theEvent.hash = match.params.hash;
	}

	return (
		<div>
			{theEvent && (
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content={title} />
					<meta name="twitter:title" content={title} />

					<meta name="description" content={description} />
					<meta name="twitter:description" content={description} />
					<meta property="og:description" content={description} />
				</Helmet>
			)}

			<Content
				match={match}
				theEvent={theEvent}
				loading={loading}
				translate={translate}
			/>

			<Footer
				noSkew
				firstTo={translate("routes./how-it-works")}
				secondTo={translate("routes./")}
				firstLabel={translate("how-it-works")}
				secondLabel={translate("arrange-event")}
				title={translate("Organizing a new event?")}
				subTitle={translate("See how it works, or arrange an event.")}
			/>
		</div>
	);
};

const Content = React.memo(({ match, ...eventProps }) => {
	const { theEvent, loading } = eventProps;

	return (
		<div>
			<ScrollToTop animate top={280} />

			<EventHeader theEvent={theEvent} loading={loading} />

			<Container>
				<Row
					style={{
						alignItems: "stretch",
						paddingTop: "60px",
						paddingBottom: "60px"
					}}
				>
					<Col
						style={{
							width: "100%",
							zIndex: 0,
							position: "relative",
							borderRight: "1px solid #E9ECF0",
							paddingRight: "42px"
						}}
					>
						<Switch>
							<Route
								path={match.path + "/overview"}
								render={props => <Overview {...props} {...eventProps} />}
							/>
							<Route
								path={match.path + "/requirements"}
								render={props => <Requirements {...props} {...eventProps} />}
							/>
							<Route
								path={match.path + "/review"}
								render={props => <Review {...props} {...eventProps} />}
							/>
							<Redirect to={match.path + "/overview"} />
						</Switch>
					</Col>
					<Col>
						<EventProgress
							style={{
								position: "sticky",
								top: "80px",
								marginLeft: "42px"
							}}
							theEvent={theEvent}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
});

export default addTranslate(Index, [content, requestFormContent, modalContent]);
