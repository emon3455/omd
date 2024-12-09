
import { Link } from 'react-router-dom'
import CButton from '../utils/CButton/CButton';
import error from "../assets/error.jpg"
        
const Error = () => {
    return (
        <div className="h-screen flex flex-col gap-0 justify-center items-center ">
            <img src={error} alt=""  className='w-96 h-96 mx-auto mb-10'/>
            <Link to='/'>
                <CButton variant={'outline'}>Go Back To Homepage</CButton>
            </Link>
        </div>
    );
    
};

export default Error;