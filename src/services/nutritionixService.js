const API_KEY = process.env.REACT_APP_NUTRITIONIX_API_KEY;
const APP_ID = process.env.REACT_APP_NUTRITIONIX_APP_ID;
const BASE_URL = process.env.REACT_APP_NUTRITIONIX_BASE_URL || 'https://trackapi.nutritionix.com/v2';

if (!API_KEY || !APP_ID) {
  console.warn('Nutritionix API credentials are not set. Create a .env file with REACT_APP_NUTRITIONIX_APP_ID and REACT_APP_NUTRITIONIX_API_KEY');
}

export const searchFoods = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/instant?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'x-app-id': APP_ID,
        'x-app-key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch food data');
    }
    
    const data = await response.json();
    return data.common.map(item => ({
      id: item.food_name,
      name: item.food_name,
      servingUnit: 'g',
      servingQty: 100, // Default to 100g
      imageUrl: item.photo.thumb
    }));
  } catch (error) {
    console.error('Error searching foods:', error);
    return [];
  }
};

export const getNutritionInfo = async (foodName, servingSize) => {
  try {
    const response = await fetch(`${BASE_URL}/natural/nutrients`, {
      method: 'POST',
      headers: {
        'x-app-id': APP_ID,
        'x-app-key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `${servingSize}g ${foodName}`
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch nutrition data');
    }
    
    const data = await response.json();
    
    if (data.foods && data.foods.length > 0) {
      const food = data.foods[0];
      return {
        name: food.food_name,
        calories: Math.round(food.nf_calories),
        protein: Math.round(food.nf_protein),
        carbs: Math.round(food.nf_total_carbohydrate),
        fat: Math.round(food.nf_total_fat),
        servingSize: servingSize,
        servingUnit: 'g'
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting nutrition info:', error);
    return null;
  }
};

// Helper function to determine meal category based on time
export const getMealCategoryByTime = () => {
  const hour = new Date().getHours();
  
  if (hour >= 4 && hour < 11) {
    return 'breakfast';
  } else if (hour >= 11 && hour < 15) {
    return 'lunch';
  } else if (hour >= 15 && hour < 18) {
    return 'snack';
  } else if (hour >= 18 && hour < 22) {
    return 'dinner';
  } else {
    return 'snack';
  }
};