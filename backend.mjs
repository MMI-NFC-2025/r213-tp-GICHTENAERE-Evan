import PocketBase from 'pocketbase';

const db = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
    try {
        let data = await db.collection('Maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await db.collection('Maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function addOffre(house) {
    try {
        await db.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function getAgent(id) {
    try {
        const data = await pb.collection('agent').getOne(id, {
                expand: 'maison',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant l\'agent', error);
        return null;
    }
}


export async function getAgents() {
    try {
        const data = await db.collection('agent').getFullList();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant l\'agent', error);
        return null;
    }
}

export async function getOffresByAgent(agentId) {
    try {
        const data = await db.collection('maison').getFullList({
            sort: '-created',
            filter: `agent = "${agentId}"`,
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant par agent', error);
        return [];
    }
}

export async function addAgent(formData) {
    try {
        await db.collection('agent').create(formData);
        return { success: true, message: 'Agent ajouté avec succès' };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant l\'agent', error);
        return { success: false, message: 'Une erreur est survenue en ajoutant l\'agent' };
    }
}

/*export async function setFavori(house) {
    try {
        await pb.collection('maison').update(house.id, { favori: !house.favori });
    } catch (error) {
        console.log('Une erreur est survenue en mettant à jour le favori', error);
    }
}*/

export async function setFavori(Maison) {
    await db.collection('maison').update(Maison.id, {favori: !Maison.favori});
}