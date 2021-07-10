import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {ADD_THOUGHT} from '../../utils/mutations';
import {QUERY_THOUGHTS, QUERY_ME} from '../../utils/queries';

function ThoughtForm(){

    const [thoughtText, setThoughtText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    
    const [addThought, {error}] = useMutation(ADD_THOUGHT,{
        update(cache, {data: {addThought}}){
            try{
                //cache could possibly not exist so put it in a cache
                //read what's currently in the cache
                const {thoughts} = cache.readQuery({query: QUERY_THOUGHTS});

                //prepend the newest thought to the front of the array
                cache.writeQuery({
                    query: QUERY_THOUGHTS,
                    data: {thoughts: [addThought, ...thoughts]}
                });
            }
            catch(err){
                console.error(err);
            }

            try{
                const {me} = cache.readQuery({query: QUERY_ME});
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, thoughts:[...me.thoughts, addThought]}}
                });
            }
            catch(err){
                console.error(err);
            } 
        }
    });

    function handleChange(event){
        if(event.target.value.length <= 280) {
            setThoughtText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }

    async function handleFormSubmit(event){
        event.preventDefault();

        try{
            //add thought to the database
            await addThought({variables: {thoughtText: thoughtText}});

            //clear form
            await setThoughtText('');
            await setCharacterCount(0);
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`} >
                Character Count: {characterCount}/280
                {error && <span className="ml-2"> Something went wrong...</span>}
            </p>
            <form 
                className="flex-row justify-center justify-space-between-md align-stretch" 
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Here's a new thought..."
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                    value={thoughtText}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ThoughtForm;