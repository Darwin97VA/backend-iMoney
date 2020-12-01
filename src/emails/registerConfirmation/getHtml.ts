import { RegisterConfirmationType } from '.'

const Linkedin = (urlBase: string) => /* html */ `
    <a href="">
        <img src="${urlBase}/img/correo-linkeding.png" width="50" />
    </a>
`
const Instagram = (urlBase: string) => /* html */ `
    <a href="">
        <img src="${urlBase}/img/correo-instagram.png" width="50" />
    </a>
`
const Facebook = (urlBase: string) => /* html */ `
    <a href="">
        <img src="${urlBase}/img/correo-facebook.png" width="50" />
    </a>
`
const Twitter = (urlBase: string) => /* html */ `
    <a href="">
        <img src="${urlBase}/img/correo-twitter.png" width="50" />
    </a>
`
const Youtube = (urlBase: string) => /* html */ `
    <a href="">
        <img src="${urlBase}/img/correo-youtube.png" width="50" />
    </a>
`

const getHtml = ({
  URL,
  nombre,
  urlBase,
}: RegisterConfirmationType) => /* html */ `
    <table style="background: #001C54">
        <thead>
            <tr>
                <th>
                    <h1>Confirme su registro!</h1>
                </th>
            </tr>
        </thead>
        <tbody>

            <tr>
                <td>
                
                    <table style="margin: 18px">
                    <tbody>
                        <tr>
                            <td>
                                <img src="${urlBase}/img/LogoAzul.png" alt="Logo de iMoney Perú" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h1 style="text-align: center">Bienvenido ${nombre}</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="border-radius: 12px; border: 1px solid rgba(0,0,0,.2); box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);">
                                    Confirma tu mail  para tu nueva experiencia en soluciones financieras
                                </div>
                            </td>
                        </tr>
            
                        <tr>
                            <td>
                                <a href="${URL}" target="_blank"
                                    style="border-radius: 8px; color: white; background: blue; padding: 2px 8px;">
                                    <div style="margin: 16px 12px; border-radius: 12px; color: white; background: #2BAADF">Confirmar</div>
                                </a>
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
                                <div style="display: flex; width: 100%; height: 100px;">
                                    ${Linkedin(urlBase)}
                                    ${Instagram(urlBase)}
                                    ${Facebook(urlBase)}
                                    ${Twitter(urlBase)}
                                    ${Youtube(urlBase)}
                                </div>
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
