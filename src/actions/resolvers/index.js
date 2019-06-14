import gql from "graphql-tag";

const resolvers = {
	Mutation: {
		paymentConfirmed: (_root, variables, { cache, getCacheKey }) => {
			const { gigId } = variables;
			const id = getCacheKey({ __typename: "Event", id: variables.eventId });
			const fragment = gql`
				fragment confirmEvent on Event {
					status
					gigs {
						id
						status
					}
				}
			`;
			const event = cache.readFragment({ fragment, id });
			let { gigs } = event;
			gigs = gigs.map(g =>
				g.id === gigId
					? { ...g, status: "CONFIRMED" }
					: { ...g, status: "LOST" }
			);
			const data = { ...event, gigs, status: "CONFIRMED" };
			cache.writeData({ id, data });
			return null;
		}
	}
};

export default resolvers;
