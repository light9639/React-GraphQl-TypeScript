import React from "react";
import { ApolloError, gql } from "apollo-boost";
import { Query } from "react-apollo";

const GET_CONTINENTS = gql`
    query {
        continents {
            code
            name
        }
    }
`;

interface graphType {
    loading?: boolean;
    error?: ApolloError | undefined;
    data: any;
}

interface mapType {
    code: string;
    name: string
}

export default function Continents(): JSX.Element {
    return (
        <React.Fragment>
            <h2>Continents</h2>
            <Query query={GET_CONTINENTS}>
                {({ loading, error, data }: graphType) => {

                    if (loading) return <p>Loading...</p>;

                    if (error) return <p>Error!</p>;

                    return (
                        <React.Fragment>
                            {data.continents.map(({ code, name }: mapType) => (
                                <p key={code}>{name}</p>
                            ))}
                        </React.Fragment>
                    );
                }}
            </Query>
        </React.Fragment>
    );
}
