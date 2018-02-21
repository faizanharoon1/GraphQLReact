
const graphql = require('graphql');

const axios = require('axios');

const {

    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphql;

// Root query is the entry point of any data.

const CompanyType= new GraphQLObjectType({
    name: 'Company',
    fields: {

        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }


    }
})
// this is how data will look for user
const UserType = new GraphQLObjectType({

    name: 'User',
    fields: {

        id: { type: GraphQLString },
        firstname: { type: GraphQLString },
        age: { type: GraphQLInt },
        company:{
            type:CompanyType
        }


    }

});

const RootQuery = new GraphQLObjectType({
 
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) { // it finds the item on ID by actually going into the database.

                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data);

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});


