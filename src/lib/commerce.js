import Commerce from '@chec/commerce.js';

// == 1er argument : On récupère dans notre fichier .env (fichier caché), la clé API commerce.js
// == 2ème argument : on met true en valeur booléenne ce qui signifie que l'on va créer un nouveau commerce
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true)

// == On export notre commerce vers App.js