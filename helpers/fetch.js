export const fetchData = async (url = '') => {
    const response = await fetch( url );
  
    if(response.status === 200){
      return response.json(); // parses JSON response into native JavaScript objects
    } else {
      return {
        status: 'error',
        errorCode: response.status,
      };
    }
  }