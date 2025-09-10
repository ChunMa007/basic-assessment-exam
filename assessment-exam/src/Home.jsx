import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet"
import { useNavigate } from "react-router-dom";

function Home() {
    const [geoData, setGeoData] = useState(null);
    const [searchIP, setSearchIP] = useState("");
    const [error, setError] = useState(null);
    const [coordinates, setCoordinates] = useState(null)
    const [searchHistory, setSearchHistory] = useState(() => {
        const history = JSON.parse(localStorage.getItem("history"))
        return history || []
    })
    const navigate = useNavigate()

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("history")) || []
        setSearchHistory(history)
    }, [])

    useEffect(() => {
        fetch("https://ipinfo.io/geo")
            .then((res) => res.json())
            .then((data) => {
                setGeoData(data)
                setCoordinates(getCoordinates(data))
            })
            .catch(() => setError("Failed to load Geo Data"))
    }, []);

    const handleSearch = async (ip) => {
        if(!ip) return;

        try{
            const res = await fetch(`https://ipinfo.io/${ip}/geo`)
            if(!res.ok) {
                throw new Error("Invalid IP Address")
            }

            const data = await res.json()
            setGeoData(data)
            setCoordinates(getCoordinates(data))
            addToHistory(searchIP)
            setError(null)
        } catch(err) {
            setError(err.message)
        }

        setTimeout(() => {
            setError(null)
        }, 1000)
    }

    const handleClear = async () => {
        setSearchIP("")
        const res = await fetch("https://ipinfo.io/geo");
        const data = await res.json();
        setGeoData(data)
        setCoordinates(getCoordinates(data))
    }

    const clickedHistory = async (ip) => {
        try{
            const res = await fetch(`https://ipinfo.io/${ip}/geo`)
            if(!res.ok) {
                throw new Error("Invalid IP Address")
            }

            const data = await res.json()
            setGeoData(data)
            setCoordinates(getCoordinates(data))
            setError(null)
        } catch(err) {
            setError(err.message)
        }
    }

    const clearHistory = () => {
        setSearchHistory([])
        localStorage.removeItem("history")
        handleClear()
    }

    const addToHistory = (ip) => {
        setSearchHistory((prev) => {
            if(!prev.includes(ip)) {
                const new_history = [...prev, ip]
                localStorage.setItem("history", JSON.stringify(new_history))
                return new_history
            }
            return prev
        })
    }

    const deleteFromHistory = (ip) => {
        setSearchHistory((prev) => {
            const new_history = prev.filter(item => item !== ip)
            localStorage.setItem("history", JSON.stringify(new_history))
            return new_history
        })
    }

    const logout = () => {
        localStorage.removeItem("IsLoggedIn")
        navigate("/login")
    }

    const history = JSON.parse(localStorage.getItem("history")) || []

    return (
        <div className="container mt-4">
            <button type="submit" className="btn btn-secondary float-end" onClick={() => logout()}>Logout</button>

            <h1 className="text-center">Geolocation Info</h1>

            <div className="d-flex justify-content-center align-items-center flex-column">
                {error && (
                    <div className="alert alert-danger" style={{position: "fixed", top: "20px"}}>
                        <strong>{error}</strong>
                    </div>
                )}

                <div className="input-group mt-3 mb-3 w-50">
                    <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvas">History</button>
                    <input type="text" 
                        className="form-control" 
                        placeholder="Search IP Address"
                        value={searchIP}
                        onChange={(e) => setSearchIP(e.target.value)}
                        />
                    <button type="submit" className="btn btn-success" onClick={() => handleSearch(searchIP)}>Search</button>
                    <button type="submit" className="btn btn-danger" onClick={handleClear}>Clear</button>
                </div>

                {coordinates && (
                    <div className="d-flex justify-content-center align-items-center border p-3">
                        <div className="me-5">
                            <MapContainer
                                center={coordinates}
                                zoom={13}
                                style={{height: "500px", width: "500px"}}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                />
                                    
                                <Marker position={coordinates}>
                                    <Popup>
                                        Location: {`${geoData.city}, ${geoData.region} ${geoData.country}`} <br />
                                        IP Address: {geoData.ip}
                                    </Popup>
                                </Marker>
                                <CenterMap coordinates={coordinates}/>
                            </MapContainer>
                        </div>

                        {geoData && (
                            <table className="table table-bordered border-dark table-sm w-25">
                                <tbody>
                                    {Object.entries(geoData).map(([key, value]) => (
                                        <tr key={key}>
                                            <td className="fw-bold">{key}</td>
                                            <td>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>

            <div className="offcanvas offcanvas-start" id="offcanvas">
                <div className="offcanvas-header">
                    <h2>History</h2>
                    <button type="button" className="btn btn-close" data-bs-dismiss="offcanvas"></button>
                </div>
                <hr />
                <div className="offcanvas-body">
                    
                    <div style={{height: '500px', overflowY: "auto"}}>
                        {history.map((ip) => (
                            <div className="border rounded p-2 mb-2 d-flex align-items-center justify-content-between">
                                <h4 className="m-0"
                                    onClick={() => clickedHistory(ip)} 
                                    style={{cursor: "pointer"}}
                                    id={ip}
                                >
                                    {ip}
                                    
                                </h4>
                                <button className="btn btn-close" onClick={() => deleteFromHistory(ip)}></button>
                            </div>
                        ))}
                    </div>

                    <button className="btn btn-danger float-end" onClick={() => clearHistory()}>Delete All</button>
                </div>
            </div>
        </div>
    )
}

function getCoordinates(data) {
    if(data.loc) {
        return data.loc.split(",").map(Number)
    }
    return null
}

function CenterMap({ coordinates }) {
    const map = useMap()

    if(coordinates) {
        map.setView(coordinates, map.getZoom())
    }
    return null
}

function addToHistory(ip) {
    const history = JSON.parse(localStorage.getItem("history")) || []

    if(!history.includes(ip)){
        history.push(ip)
    }
    
    localStorage.setItem("history", JSON.stringify(history))
}

export default Home