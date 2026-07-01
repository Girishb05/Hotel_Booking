//GET /api/user 


export const getUserData = async (req, res)=> {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentlySearchedCities || req.user.recentlySearchedHotels || [];
        res.json({
            success: true,
            role,
            recentSearchedCities
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}


//Store User Recently Searched Cities

export const storeRecentlySearchedCities = async (req, res) => {
    try {
        const { recentlySearchedCity } = req.body;
        const user = req.user;

        if (!recentlySearchedCity) {
            return res.status(400).json({
                success: false,
                message: "Missing recently searched city"
            });
        }

        user.recentlySearchedCities = user.recentlySearchedCities || [];

        if (user.recentlySearchedCities.length < 3) {
            user.recentlySearchedCities.push(recentlySearchedCity);
        } else {
            user.recentlySearchedCities.shift();
            user.recentlySearchedCities.push(recentlySearchedCity);
        }

        await user.save();
        res.json({
            success: true,
            message: "Recently searched city added successfully"
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}
