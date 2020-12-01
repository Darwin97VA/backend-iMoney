import { RegisterConfirmationType } from '.'

const Linkedin = (urlBase: string) => /* html */ `
    <a href="https://www.linkedin.com/company/imoney-peru-sac/" target="_blank" style="margin: 8px 8px; display: inline-block;">
        <img src="${urlBase}/img/correo-linkedin.png" width="50" />
    </a>
`
const Instagram = (urlBase: string) => /* html */ `
    <a href="https://www.instagram.com/imoneyperu/" target="_blank" style="margin: 8px 8px; display: inline-block;">
        <img src="${urlBase}/img/correo-instagram.png" width="50" />
    </a>
`
const Facebook = (urlBase: string) => /* html */ `
    <a href="https://www.facebook.com/imoney.pe/?ref=bookmarks" target="_blank" style="margin: 8px 8px; display: inline-block;">
        <img src="${urlBase}/img/correo-facebook.png" width="50" />
    </a>
`
const Twitter = (urlBase: string) => /* html */ `
    <a href="https://twitter.com/imoney_peru" target="_blank" style="margin: 8px 8px; display: inline-block;">
        <img src="${urlBase}/img/correo-twitter.png" width="50" />
    </a>
`
const Youtube = (urlBase: string) => /* html */ `
    <a href="https://www.youtube.com/channel/UCrGvRpgVyFpEEvITbA6NBrA?view_as=subscriber" target="_blank" style="margin: 8px 12px; display: inline-block;">
        <img src="${urlBase}/img/correo-youtube.png" width="50" />
    </a>
`

const getHtml = ({
  URL,
  nombre,
  urlBase,
}: RegisterConfirmationType) => /* html */ `
    <table style="background: #001C54; color: white;">
        <thead>
            <tr>
                <th>
                    <h1 style="font-size: 36px;">Confirme su registro!</h1>
                </th>
            </tr>
        </thead>
        <tbody>

            <tr>
                <td>
                
                    <table style="margin: 36px 64px; background: white; color: black;">
                    <tbody>
                        <tr>
                            <td style="display: flex; justify-content: center;">
                                <img src="${urlBase}/img/LogoAzul.png" style="display:inline-block; margin: auto; width: 100%; max-width: 270px;" alt="Logo de iMoney Perú" />
                            </td>
                        </tr>
                        <tr>
                            <td style="">
                                <h2 style="text-align: center">Bienvenido ${nombre}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style="">
                                <div style="text-decoration: none; 
                                    -webkit-box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
                                    -moz-box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
                                    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
                                    padding: 12px;
                                    width: 260px; height: 60px; font-size: 14px; 
                                    display: block; border-radius: 12px;margin: auto">
                                    <div style="text-align: center; display: inline-block; border-radius: 12px;">
                                        Confirma tu mail  para tu nueva experiencia en soluciones financieras
                                    </div>
                                </div>
                            <td/>
                        </tr>
            
                        <tr>
                            <td>
                                <div style="margin: auto">
                                    
                                <a href="${URL}" target="_blank"
                                    style="
                                    text-decoration: none; width: 170px; height: 60px; font-size: 20px; 
                                    display: block; border-radius: 12px; background: #2BAADF; margin: auto">
                                    <div style="display: inline-block; margin: 16px 12px; border-radius: 12px; color: white;">Confirmar Email</div>
                                </a>
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <div>
                                    Si no se visualiza el botón entonces ingrese a la siguiente URL para confirmar su registro:
                                </div>
                                <div style="color: blue; text-decoration: underline">${URL}</div>
                            </td>
                        </tr>
            
                        <tr>
                            <td>
                                <table style="width: 100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                ${Linkedin(urlBase)}
                                            </td>
                                            <td>
                                                ${Instagram(urlBase)}
                                            </td>
                                            <td>
                                                ${Facebook(urlBase)}
                                            </td>
                                            <td>
                                                ${Twitter(urlBase)}
                                            </td>
                                            <td>
                                                ${Youtube(urlBase)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                    </table>








                
                
                </td>
            </tr>


        </tbody>
    </table>
`

export default getHtml
