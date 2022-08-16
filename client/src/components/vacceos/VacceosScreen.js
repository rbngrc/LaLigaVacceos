import React, { Fragment } from 'react';

import shop from "../../assets/Icono-WEB.png";

import '../../styles/vacceosScreen.css';

export const VacceosScreen = () => {
  return (
    <Fragment>
        <div className="box-info">
            <div className="card">
                <div
                    className="card_imagen" 
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: "url(http://www.iconninja.com/files/977/93/92/black-twitch-icon.png"
                    }}
                />
                <a href="https://www.twitch.tv/headcoachfran">Twitch</a>
            </div>
            <div className="card">
                <div
                    className="card_imagen" 
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: "url(https://www.freeiconspng.com/uploads/discord-black-icon-1.png"
                    }}
                />
                <a href="https://discord.gg/2rHnDXjD8D">Discord</a>
            </div>
            <div className="card">
                <div
                    className="card_imagen" 
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${shop})`
                    }}
                />
                <a href="https://www.latostadora.com/vacceosbox/">La tostadora</a>
            </div>
        </div>
    </Fragment>
)
}
