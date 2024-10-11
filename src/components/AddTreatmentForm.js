import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTreatmentForm = ({ API_URL, onAdd }) => {
    const [frequency, setFrequency] = useState(1); // Valeur par défaut
    const [compartement, setCompartement] = useState(1); // Valeur par défaut
    const [medecineBoxes, setMedecineBoxes] = useState([]); // Liste des médicaments
    const [selectedMedecineBox, setSelectedMedecineBox] = useState(''); // Médicament sélectionné
    const [treatmentTime, setTreatmentTime] = useState(''); // Heure du traitement

    // Charger la liste des médicaments au chargement du composant
    useEffect(() => {
        const fetchMedecineBoxes = async () => {
            try {
                const response = await axios.get(`${API_URL}/medecine_boxes`);
                setMedecineBoxes(response.data); // Stocker les médicaments dans l'état
            } catch (error) {
                console.error('Erreur lors de la récupération des médicaments :', error);
            }
        };

        fetchMedecineBoxes();
    }, [API_URL]);

    // Gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1ère requête : Créer le traitement
            const medecineBox = medecineBoxes.find(box => box.name === selectedMedecineBox);
            const treatmentResponse = await axios.post(`${API_URL}/treatment`, {
                frequency: frequency,
                compartement: compartement,
                medecine_box_id: medecineBox.id,
            });

            const newTreatment = treatmentResponse.data; // Récupère le traitement créé

            // 2ème requête : Ajouter l'heure du traitement avec l'ID du traitement
            const timeResponse = await axios.post(`${API_URL}/treatments/time`, {
                treatment_id: newTreatment.id, // ID du traitement créé
                time: treatmentTime, // Heure du traitement
            });

            console.log('Heure de traitement ajoutée avec succès:', timeResponse.data);

            onAdd(newTreatment); // Met à jour l'état dans le composant parent
        } catch (error) {
            console.error('Erreur lors de la création du traitement ou de l\'ajout de l\'heure :', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-4">
            {/* Sélection de la fréquence */}
            <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                    Fréquence (jours)
                </label>
                <select
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(parseInt(e.target.value))}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md"
                >
                    {[...Array(7).keys()].map((day) => (
                        <option key={day + 1} value={day + 1}>
                            Tous les {day + 1} jours
                        </option>
                    ))}
                </select>
            </div>

            {/* Sélection du compartiment */}
            <div>
                <label htmlFor="compartement" className="block text-sm font-medium text-gray-700">
                    Compartiment
                </label>
                <select
                    id="compartement"
                    value={compartement}
                    onChange={(e) => setCompartement(parseInt(e.target.value))}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md"
                >
                    {[1, 2].map((comp) => (
                        <option key={comp} value={comp}>
                            Compartiment {comp}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sélection du médicament */}
            <div>
                <label htmlFor="medecine_box" className="block text-sm font-medium text-gray-700">
                    Médicament
                </label>
                <select
                    id="medecine_box"
                    value={selectedMedecineBox}
                    onChange={(e) => setSelectedMedecineBox(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md"
                >
                    <option value="">Sélectionnez un médicament</option>
                    {medecineBoxes.map((box) => (
                        <option key={box.id} value={box.name}>
                            {box.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Ajout de l'heure du traitement */}
            <div>
                <label htmlFor="treatment_time" className="block text-sm font-medium text-gray-700">
                    Heure du traitement
                </label>
                <input
                    type="time"
                    id="treatment_time"
                    value={treatmentTime}
                    onChange={(e) => setTreatmentTime(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md"
                />
            </div>

            {/* Bouton pour soumettre */}
            <div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Ajouter un traitement
                </button>
            </div>
        </form>
    );
};

export default AddTreatmentForm;
