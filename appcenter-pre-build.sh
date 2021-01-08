#!/bin/bash
cd ${APPCENTER_SOURCE_DIRECTORY}
echo “USER_POOL_ID=${us-east-1_77fGrGwzg}” >> .env
echo “USER_POOL_CLIENT_ID=${21bq58t9j7c2r22bbvm23f8dk6}” >> .env
echo “SANITY_PROJECT_ID=${cqs8qte2}” >> .env
echo “SANITY_GRAPHQL_URL=${https://cqs8qte2.api.sanity.io/v1/graphql/staging/default}” >> .env
echo “LVLD_API_BASE_URL=${https://3jbx741ljk.execute-api.us-east-1.amazonaws.com/staging}” >> .env