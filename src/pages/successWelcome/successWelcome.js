import React from 'react'



const Navbar = () => {
  
  
    return (
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="text-white">
                  Your Logo
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/welcome"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/price"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Price
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  const WelcomePage = () => {
  
    const userDetails = useContext(UserContext); // Use updateUserDetails from UserContext
    
   
  
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome {userDetails.userDetails.username}
          </h1>
          <p className="text-lg text-gray-600">
            This is your welcome page. Feel free to customize it!
          </p>
        </div>
      </div>
    );
  };

const successWelcome = () => {
  return (
    <div>
      <Navbar />
      <WelcomePage />

    </div>
  ) 
}

export default successWelcome