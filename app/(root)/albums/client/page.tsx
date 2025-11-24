'use client'
import React, {useEffect, useState} from 'react'

const Page = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/albums');
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                console.error("Error fetching albums: ", error);
            }
        }

        fetchAlbums();
    }, []);

    return (
        <div>
            <h1>Albums (Client-side Fetching)</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col">
                {albums.map((album: {id: string, title: string}) => (
                    <div key={album.id} className="bg-white shadow-md rounded-lg p-4 tran...">
                        <h3 className="text-lg font-bold mb-2">{album.title}</h3>
                        <p className="text-gray-600">Album ID: {album.id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Page
