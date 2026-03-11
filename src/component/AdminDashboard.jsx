



function AdminDashboard({onLogout}) {
    return(
        <>
            <div className=" w-screen h-screen flex flex-col bg-emerald-300 gap-5">
                <div className="w-screen h-20 bg-white flex justify-between items-center p-5 ">
                    <h3>Welcome Admin!</h3>
                    <div className="bg-gray-400 w-80 h-20 flex border justify-center items-center">
                        <h6>Name here</h6>
                    </div>
                    <div className="bg-gray-400 w-80 h-20 flex border justify-center items-center">
                        <input type="text" className="border rounded-2xl w-60 h-8" placeholder="Search here..."/>
                    </div>
                </div>
                <div className="bg-white w-screen h-180 border flex justify-center items-center">
                    <div className="bg-gray-300 w-7xl h-160 border shadow-2xl">

                    </div>
                </div>
                <div>
                    <button onClick={onLogout}>Logout</button>
                </div>
            </div>
        </>
    )
};


export default AdminDashboard