import React from 'react';
import { format } from 'date-fns';
import axios from "axios";
import {API_URL} from "../config";

const ReminderCard = ({id, name, frequency, treatmentTimes, compartement, onDelete}) => {
    const getFrequencyText = (frequency) => {
        if (frequency === 1) return "Tous les jours";
        return `Tous les ${frequency} jours`;
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(`Voulez-vous vraiment supprimer le traitement de ${name} ?`);
        if (confirmed) {
            try {
                // Requête API DELETE pour supprimer le traitement
                await axios.delete(`${API_URL}/treatment/${id}`);
                // Appeler une fonction callback pour mettre à jour l'état parent
                onDelete(id);
            } catch (error) {
                console.error("Erreur lors de la suppression du traitement :", error);
                alert("Une erreur est survenue lors de la suppression.");
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-lg font-bold py-2">
                {name}
            </p>
            <div className="flex flex-col items-center">
                <p className="text-lg py-2">{getFrequencyText(frequency)} à :</p>
                {treatmentTimes.map((time) => (
                    <p className="text-xl font-bold py-2" key={time.id}>{format(new Date(time.time), 'HH:mm')}</p>
                ))}
                <p className="text-lg py-2">Compartiment {compartement}</p>
            </div>
            <div className="flex justify-between m-4">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">Modifier</button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-6 py-2 rounded-lg">Supprimer</button>
            </div>
        </div>
    );
};

export default ReminderCard;
