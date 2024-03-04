import { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { water_tracker } from '../../ApiService/water_tracker';
import { water_tracker_list } from '../../ApiService/water_tracker';
import { update_water_tracker_list } from '../../ApiService/water_tracker';
import { restartWater } from '../../ApiService/water_tracker';
import { updateWaterTarget } from '../../ApiService/water_tracker';

const HomePage = () => {
    const [waterTarget, setWaterTarget] = useState(0);
    const [waterConsumed, setWaterConsumed] = useState(0);
    const [showWaterDiv, setShowWaterDiv] = useState(false);
    const [waterListId, setWaterListId] = useState(0);
    const [DisplayWaterTargetDiv, setDisplayWaterTargetDiv] = useState(false);
    const [DisplayTargetIcon, setDisplayTargetIcon] = useState(true);


    useEffect(() => {
        loadWaterTarget();
    }, []);
  

    const loadWaterTarget = () => {
        water_tracker_list().then(storedTarget => {
            if (storedTarget.waterTargetList === undefined) {
                setWaterTarget(0);
                setWaterConsumed(0);
                setDisplayWaterTargetDiv(false)
                setDisplayTargetIcon(true)
            } else {
                setWaterTarget(storedTarget.waterTargetList[0].waterTarget);
                setWaterConsumed(storedTarget.waterTargetList[0].waterConsumed);
                setWaterListId(storedTarget.waterTargetList[0].id)
                setDisplayTargetIcon(false)
                setDisplayWaterTargetDiv(true)
            }
        }).catch(error => {
            console.error('Error loading water target:', error);
        });
    };

    const handleRestartWater = () => {
        restartWater({waterListId})
        .then(() => {
            loadWaterTarget();
            location.reload()
        })
    }
    
  
    const handleShowWaterTarget = () => {
        // Add logic to save water target
        water_tracker()
        .then(()=> {
            setDisplayWaterTargetDiv(true)
            location.reload()
        })
    }


    const handleSaveWaterTarget = async() => {
        // Add logic to save water target
        const targetWater = await updateWaterTarget({waterTarget})
        setWaterTarget(targetWater.waterList[0].waterTarget)
    }

    const handleSaveWaterConsumed = async() => {
        const consumedWater = await update_water_tracker_list({waterListId, waterConsumed})
        setWaterConsumed(consumedWater.waterList[0].waterConsumed);
    }

    return (
        <div>
            <section id="main-section">
                <div className="display-div">
                    <div className="display-div-nav">
                        <div className="water-info">{waterConsumed} / { waterTarget} {'ML'}</div>
                        <span className="material-symbols-outlined" id="water-icon" onClick={() => setShowWaterDiv(true)}>water_drop</span>
                        <Link to="/documentationPage"><span className="material-symbols-outlined" id="book-icon">auto_stories</span></Link>
                    </div>

                    {/* water saved info */}
                    <div id="waterIconDiv" style={{ display: showWaterDiv ? "block" : "none" }}>
                        <div className="main-div-water">
                            <div className="icons-close-reset">
                                <span className="material-symbols-outlined" id="reset-icon" onClick={() => handleRestartWater()}> restart_alt</span>
                                {DisplayTargetIcon && <span className="material-symbols-outlined" onClick={() => handleShowWaterTarget()}>water_drop</span>}
                                <span className="material-symbols-outlined" id="close-icon" onClick={() => setShowWaterDiv(false)}>close</span>
                            </div>
                            {DisplayWaterTargetDiv && <div className="water-target-div">
                                <h1>Set Water Target</h1>
                                <input 
                                    type="number" 
                                    id="waterTargetInput" 
                                    name="waterTargetInput" 
                                    value={waterTarget} 
                                    onChange={(e) => setWaterTarget(e.target.value)} />
                                <button onClick={() => handleSaveWaterTarget()}>Save</button>
                            </div>}

                            {DisplayWaterTargetDiv &&  <div className="water-consumed-div">
                                <h1>Water Consumed</h1>
                                <input 
                                    type="number" 
                                    id="waterConsumedInput" 
                                    name="waterConsumedInput" 
                                    value={waterConsumed} 
                                    onChange={(e) => setWaterConsumed(e.target.value)} />
                                <button onClick={()=> handleSaveWaterConsumed()}>Save</button>
                            </div>}
                        </div>
                    </div>

                    {/* motivational quote */}
                    <div className="motivational-quote-div">
                        <h1 className="MotivationalQuote"></h1>
                    </div>
                </div>

                <div className="first-row">
                    <div className="result-item">

                        <Link to="/cal_tracker"><div className="item">Calories Tracker</div></Link>
                        
                        <Link to="/bmi_calculator"><div className="item">BMI,BMR, Calculator</div></Link>

                        <Link to="/workout_tracker"><div className="item div3">Workout Tracker</div></Link>
                    </div>
                </div>

                <div className="second-row">
                    <div className="result-item">
                        <Link to="/recipe_section"><div className="item">Fresh Food Finder</div></Link>
                        <Link to="/macro_calculator"><div className="item">MacroNutrient Calculator</div></Link>
                    </div>
                </div>
            </section>

            <div className="bottom-nav-div">
                <div className="iconDiv">
                    <Link to=""><span className="material-symbols-outlined" id="icons">home</span></Link>
                </div>
                <div className="iconDiv">
                    <Link to="/dataPage" id="account-icon"><span className="material-symbols-outlined icons" id="icons"> person</span></Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
