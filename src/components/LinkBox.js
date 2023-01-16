import { useState, useContext } from 'react';
import { MyContext } from '../App'
import { youtube_parser } from '../helpers/helper';


export default function LinkBox() {
    const [text, setText] = useState('');
    const { state, setState } = useContext(MyContext);

    const handleClick = () => {
        setState({ ...state, videoId: youtube_parser(text) })
    }

    return (
        <div>
            <h4 className="mx-2">Enter YouTube link: </h4>
            <input type="text" className='mx-2' onChange={e => setText(e.target.value)}></input>
            <button onClick={handleClick}
                className='mx-2 btn btn-primary'>Update!</button>
        </div >

    )
}
