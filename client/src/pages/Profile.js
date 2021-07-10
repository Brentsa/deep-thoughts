import React from 'react';
import { Redirect, useParams} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';
import {QUERY_USER, QUERY_ME} from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = () => {

  //Get the params from the URL, in this case the username and set it to userParam
  const {username: userParam} = useParams();

  //Run our queries for data using either Query user or Query me using the username param
  const {loading, data} = useQuery(userParam ? QUERY_USER : QUERY_ME, {variables: {username: userParam}});

  //if there is me data then set the user to that otherwise set it to the found user
  const user = data?.me || data?.user || {};

  //define an addFriend mutation
  const [addFriend] = useMutation(ADD_FRIEND);

  async function handleClick(){
    try{
      await addFriend({variables: {id: user._id}});
    }
    catch(err){
      console.error(err);
    }
  }

  //if the user is logged in and the username matches the url then we redirect to the /profile url
  if(Auth.loggedIn() && Auth.getProfile().data.username === userParam){
    return <Redirect to="/profile" />;
  }

  //return a loading div while the query is requesting info from the server
  if(loading) return <div>Loading...</div>;

  //if the user is not logged in and they try to go to /profile, then they are given a message
  if(!user?.username){
    return(
      <h4>You must be logged in to see this page. Use the navigation links above to log in or sign up!</h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
        
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 col-lg-8 mb-3">
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts....`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList username={user.username} friendCount={user.friendCount} friends={user.friends} />  
        </div>
      </div>
      {!userParam && (
        <div className="mb-3">
          <ThoughtForm/>
        </div>
      )}
    </div>
  );
};

export default Profile;
