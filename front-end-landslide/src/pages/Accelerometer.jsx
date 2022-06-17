import { Chart } from "../components";

const Accelerometer = () => {
    return <div className='w-full'>
        <div style={{"maxWidth":"1000px"}} className='mx-auto'><Chart type='acc'/></div>
    </div>
}
 
export default Accelerometer;