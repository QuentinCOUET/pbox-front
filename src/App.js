import NavBar from './components/NavBar'; // NavBar fixe
import ReminderCard from './components/ReminderCard'; // Une carte de rappel
import {useState, useEffect} from 'react';
import axios from 'axios';
import {API_URL} from "./config";


function App() {
    const [treatments, setTreatments] = useState([]); // Stocker les traitements

    // Appeler l'API lorsque le composant est monté
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/treatment`);
                setTreatments(response.data); // Mettre à jour l'état avec les traitements récupérés
            } catch (error) {
                console.error('Erreur lors de la récupération des traitements :', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (id) => {
        setTreatments((prevTreatments) =>
            prevTreatments.filter((treatment) => treatment.id !== id)
        );
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100 ">
            {/* Section Prochaine prise */}
            <div className="p-4">
                <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col items-center">
                    <p className="text-lg font-medium py-2">Prochaine prise de médicament(s) :</p>
                    <p className="text-lg font-bold py-2">
                        "nextMedication.name"
                    </p>
                    <p className="text-4xl font-bold py-2">"nextMedication.time"</p>
                </div>

                {/* Section Rappels */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Rappels</h2>
                    <button className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                        +
                    </button>
                </div>

                {/* List de cartes de rappels */}
                {/* Liste des rappels */}
                <div className="space-y-4">
                    {treatments.length > 0 ? (
                        treatments.map((treatment) => (
                            <ReminderCard
                                key={treatment.id}
                                id={treatment.id}
                                name={treatment.medecineBox.name}
                                frequency={treatment.frequency}
                                treatmentTimes={treatment.treatmentTimes}
                                compartement={treatment.compartement}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p>Chargement des rappels...</p> // Message d'attente pendant le chargement des données
                    )}
                </div>
                <div className="h-24 w-max">

                </div>
            </div>

            {/* NavBar fixe en bas */}
            <NavBar/>
        </div>
    );
}

export default App;
