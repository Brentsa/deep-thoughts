import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';
import Auth from '../utils/auth';

const Home = () => {
  //employ the useQuery function to execute QUERY_THOUGHTS
  //when the homepage loads, query for all the thought data
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  //optional chaining - if data exists, store it the thoughts variable, otherwise save an empty string;
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  //check if the user is logged in, will be used for conditional rendering
  const loggedIn = Auth.loggedIn();

  //use object destructuring to pull the 'data' object from the me query response and rename it userData
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm/>
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (<div>loading...</div>) : <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..."/> }
          </div>
          {loggedIn && userData ?(
              <div className='col-12 mb-3 col-lg-3'>
                <FriendList username={userData.me.username} friendCount={userData.me.friendCount} friends={userData.me.friends}/>
              </div>
            ) : null
          }
      </div>
    </main>
  );
};

export default Home;
