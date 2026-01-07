import React, { useState, useCallback } from 'react';
import NavBar from './components/NavBar/NavBar';
import UserCommentForm from './components/UserCommentForm/UserCommentForm';
import UserCommentList from './components/UserCommentList/UserCommentList';
import UserCommentDetails from './components/UserCommentDetails/UserCommentDetails';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('form');
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleMenuChange = (menuId) => {
    setActiveMenu(menuId);
    if (menuId !== 'details') {
      setSelectedCommentId(null);
    }
  };

  const handleSelectComment = useCallback((commentId) => {
    setSelectedCommentId(commentId);
    setActiveMenu('details');
  }, []);

  const handleBackToList = useCallback(() => {
    setActiveMenu('list');
    setSelectedCommentId(null);
  }, []);

  const renderContent = () => {
    switch (activeMenu) {
      case 'form':
        return <UserCommentForm />;
      case 'list':
        return <UserCommentList onSelectComment={handleSelectComment} />;
      case 'details':
        return (
          <UserCommentDetails
            commentId={selectedCommentId}
            onBack={handleBackToList}
          />
        );
      default:
        return <UserCommentForm />;
    }
  };

  return (
    <div className="App">
      <NavBar activeMenu={activeMenu} onMenuChange={handleMenuChange} />
      {renderContent()}
    </div>
  );
}

export default App;
