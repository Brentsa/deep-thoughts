import {useState} from 'react';

function ThoughtForm(){

    const [thoughtText, setThoughtText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    function handleChange(event){
        if(event.target.value.length <= 280) setThoughtText(event.target.value);
        
        setCharacterCount(event.target.value.length);
    }

    async function handleFormSubmit(event){
        event.preventDefault();

        console.log(thoughtText);
        
        setThoughtText('');
        setCharacterCount(0);
    }

    return (
        <div>
            <p className={`m-0 ${characterCount >= 280 ? 'text-error' : ''}`} >
                Character Count: {characterCount}/280
            </p>
            <form 
                className="flex-row justify-center justify-space-between-md align-stretch" 
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Here's a new thought..."
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ThoughtForm;