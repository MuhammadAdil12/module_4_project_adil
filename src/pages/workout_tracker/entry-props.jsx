import { useState} from "react";
import { update_workout_tracker_entry } from '../../ApiService/workout_tracker'
// import { workout_tracker_delete } from '../../ApiService/workout_tracker'



export const EntryRow = ({ entry, id, setEntries, handleOnDelete}) => {

    const [date, setDate ] = useState(new Date(entry.tracker_date).toLocaleDateString('en-CA'))
    const [workout, setWorkout ] = useState(entry.tracker_workout)
    const [duration, setDuration ] = useState(entry.tracker_duration)


    
    const updateEntry = () => {
        update_workout_tracker_entry({ date, workout, duration, id })
            .then((list) => {
                setEntries([list.list])
                console.log(list.list);
                alert('Your entry has being updated')
            })
            .catch(error => {
                console.error("Error updating entry:", error);
            });
    }

    return (
        <tr className="tracker__row">
            <td>
                <input
                    type="date"
                    className="tracker__date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </td>
            <td>
                <select
                    className="tracker__workout"
                    name="workout"
                    value={workout}
                    onChange={(e) => setWorkout(e.target.value)}
                >
                    <option value="walking">Walking</option>
                    <option value="running">Running</option>
                    <option value="outdoor-cycling">Outdoor Cycling</option>
                    <option value="indoor-cycling">Indoor Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="yoga">Yoga</option>
                </select>
            </td>
            <td>
                <input
                    className="tracker__duration"
                    type="number"
                    name="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <span className="tracker__text">min</span>
            </td>
            <td onClick={updateEntry} className="sv">
                SV
            </td>
            <td>
                <button
                    type="button"
                    className="tracker__button tracker__delete"
                    // onClick={() => deleteEntry(entry)}
                    onClick={() => handleOnDelete(id)}
                >
                    &times;
                </button>
            </td>
        </tr>
    );
}
