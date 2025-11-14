import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import VotesList from './Pages/Votes/List/List';
import CreateVote from './Pages/Votes/Create/Create';
import ShowVote from './Pages/Votes/Edit/Edit';
import EditVote from './Pages/Votes/Show/Show';

// -----------------------------------------------------------------
// 1. Définition du Mock de Candidat
//    (À remplacer par votre logique de chargement de candidat réelle)
// -----------------------------------------------------------------
const mockCandidate = {
    id: 0,
    name: "",
    event: {  vote_amount: 100 } // Montant du vote unitaire
};

// -----------------------------------------------------------------
// 2. Composants Wrappers
//    Ces composants sont nécessaires pour extraire les paramètres
//    de l'URL (comme :voteId) et les passer aux composants de détail.
// -----------------------------------------------------------------

const ShowVoteWrapper: React.FC = () => {
    // useParams permet de récupérer les variables dynamiques de l'URL, ex: /votes/10 -> voteId est "10"
    const { voteId } = useParams<{ voteId: string }>();
    // Assurez-vous que voteId existe avant de l'utiliser
    if (!voteId) return <h1 className="text-red-500">Erreur: ID de vote manquant.</h1>;
    return <ShowVote voteId={voteId} />;
};

const EditVoteWrapper: React.FC = () => {
    const { voteId } = useParams<{ voteId: string }>();
    if (!voteId) return <h1 className="text-red-500">Erreur: ID de vote manquant.</h1>;
    return <EditVote voteId={voteId} />;
};


// -----------------------------------------------------------------
// 3. Composant Principal App
// -----------------------------------------------------------------

const App: React.FC = () => {
  return (
    <Router>
      <header className="bg-gray-800 p-4 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Administration des Votes</h1>
        <nav className="mt-2 space-x-4">
          <Link to="/" className="text-blue-300 hover:text-blue-100 transition duration-150">
            Liste des Votes
          </Link>
          <Link to="/votes/create" className="text-green-300 hover:text-green-100 transition duration-150">
            Créer un Vote (Mock)
          </Link>
          {/* Ajoutez d'autres liens de navigation ici */}
        </nav>
      </header>

      <main className="p-8 bg-gray-50 min-h-screen">
        <Routes>
          {/* Route par défaut pour la liste des votes */}
          <Route path="/" element={<VotesList />} />

          {/* Route pour la création d'un nouveau vote (utilise le mockCandidate) */}
          <Route 
            path="/votes/create" 
            element={<CreateVote candidate={mockCandidate} />} 
          />
          
          {/* Route pour afficher les détails d'un vote (ID dynamique) */}
          <Route 
            path="/votes/:voteId" 
            element={<ShowVoteWrapper />} 
          />
          
          {/* Route pour modifier un vote (ID dynamique) */}
          <Route 
            path="/votes/:voteId/edit" 
            element={<EditVoteWrapper />} 
          />
          
          {/* Route de secours 404 */}
          <Route path="*" element={<h1 className="text-xl text-red-500">404 - Page non trouvée</h1>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;