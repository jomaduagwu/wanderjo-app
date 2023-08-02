export const getSavedDestinationIds = () => {
    const savedDestinationIds = localStorage.getItem('saved_destinations')
      ? JSON.parse(localStorage.getItem('saved_destinations'))
      : [];
  
    return savedDestinationIds;
  };
  
  export const saveDestinationIds = (destinationIdArr) => {
    if (destinationIdArr.length > 0) {
      localStorage.setItem('saved_destinations', JSON.stringify(destinationIdArr));
    } else {
      localStorage.removeItem('saved_destinations');
    }
  };
  
  export const removeDestinationId = (destinationId) => {
    const savedDestinationIds = JSON.parse(localStorage.getItem('saved_destinations'));
  
    if (!savedDestinationIds) {
      return false;
    }
  
    const updatedSavedDestinationIds = savedDestinationIds.filter(
      (savedDestinationId) => savedDestinationId !== destinationId
    );
    localStorage.setItem('saved_destinations', JSON.stringify(updatedSavedDestinationIds));
  
    return true;
  };
  