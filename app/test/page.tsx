import React from 'react';

const Page: React.FC = () => {
    
    // Fonction de traitement du formulaire
    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Empêche le rechargement de la page
        
        const formData = new FormData(event.currentTarget); // Récupère les données du formulaire
        
        console.log("Form Data:", formData);

    };

    return (
        <div>
            <form onSubmit={handleForm}>
                <input type="text" name="example" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Page;
