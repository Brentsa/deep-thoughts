import {Link} from 'react-router-dom';

function FriendList({username, friendCount, friends}){
    if(friendCount < 1 || !friends || !friends.length){
        return <p className="bg-dark text-light p-3">{username}, make some friends!</p>
    }
    
    return (
        <div>
            <h5>
                {username}'s {friendCount} {friendCount > 1 ? `friends` : 'friend'}
            </h5>
            {friends.map(friend => (
                <button className="btn w-100 display-block mb-2" key={friend._id}>
                    <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                </button>
            ))}
        </div>
    );
}

export default FriendList;