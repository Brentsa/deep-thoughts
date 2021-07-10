import {useState} from 'react';
import { useMutation } from '@apollo/client';
import {ADD_REACTION} from '../../utils/mutations';

function ReactionForm({thoughtId}){

    const [reactionBody, setReactionBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addReaction, {error}] = useMutation(ADD_REACTION);

    function handleChange(event){
        if(event.target.value.length <= 280) {
            setReactionBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }

    async function handleFormSubmit(event){
        event.preventDefault();
        
        try{
            await addReaction({variables: {thoughtId: thoughtId, reactionBody: reactionBody}})

            await setReactionBody('');
            await setCharacterCount(0);
        }
        catch(err){
            console.error(err);
        }
    }

    return(
        <div>
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">'Something went wrong...'</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    className="form-input col-12 col-md-9"
                    value={reactionBody}
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ReactionForm;