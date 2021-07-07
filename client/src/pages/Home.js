import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  //employ the useQuery function to execute QUERY_THOUGHTS
  //when the homepage loads, query for all the thought data
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  //optional chaining - if data exists, store it the thoughts variable, otherwise save an empty string;
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (<div>loading...</div>) : <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..."/> }
        </div>
      </div>
    </main>
  );
};

export default Home;
