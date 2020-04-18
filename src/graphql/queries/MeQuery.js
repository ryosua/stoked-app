import { gql } from 'apollo-boost'

import UserFragment from '../fragments/UserFragment'

const MeQuery = gql`
    query Me {
        me {
            ...UserFragment
        }
    }
    ${UserFragment}
`
export default MeQuery
