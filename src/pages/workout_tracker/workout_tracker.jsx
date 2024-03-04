  import { useState, useEffect } from 'react';
  import './workout_tracker.css'
  import { EntryRow } from './entry-props'
  import { workout_tracker_list } from "../../ApiService/workout_tracker"
  import { workout_tracker_backend } from '../../ApiService/workout_tracker'
  import { Link } from 'react-router-dom';
  import { workout_tracker_delete } from '../../ApiService/workout_tracker'


 
export const Workout_tracker = () => {
    const [entries, setEntries] = useState([]);

    let allEntries = entries[0] || []

    useEffect(() => {
        loadEntries();
    }, []);


    const loadEntries = () => {
        workout_tracker_list().then(storedEntries => {

            setEntries([storedEntries.workout_tracker_list]);
        }).catch(error => {
            console.error('Error loading entries:', error);
        });
    };
    



    const addEntry = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const newEntry = {
            date: ` ${year}-${month}-${day} `,
            workout: "running",
            duration: 30
        };
        workout_tracker_backend(newEntry)
            .then((list) => {
                setEntries([list.list])

            })
            .catch((error) => {
                console.error("Error adding entry:", error);
            });
    };


    const handleOnDelete = (id) => {
        workout_tracker_delete({id})
        .then(()=> {
            location.reload()
            // setEntries([list.workout_tracker_list])
            // console.log('the lsit' , list.workout_tracker_list);
        })
    };



    

    return (
        <div id="main">
                        <div className='tracker-row'>
                            <div>
                            <Link to="/home">
                                <span className="material-symbols-outlined back-arrow"> {'<'}</span>
                            </Link>
                            </div>
                            <div>Date</div>
                            <div>Workout</div>
                            <div>Duration</div>
                            <div>Save</div>
                        </div>
            <table className="tracker">
                <thead>
   


                </thead>
                <tbody className="tracker__entries">
                    {allEntries.map((entry, index) => (
                        <EntryRow
                            key={index}
                            id={entry.id}
                            entry={entry}
                            setEntries = {setEntries}
                            handleOnDelete = {handleOnDelete}
                        />
                    ))}
                </tbody>
                <tbody>
                    <tr className="tracker__row tracker__row__add">
                        <td colSpan="2">
                            <button className="tracker__add" onClick={addEntry}>Add Entry</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}