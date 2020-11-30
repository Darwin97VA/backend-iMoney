import { RegisterConfirmationType } from '.'

const getHtml = ({ URL }: RegisterConfirmationType) => /* html */ `
    <table>
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
                    <a href="${URL}" target="_blank"
                        style="border-radius: 8px; color: white; background: blue; padding: 2px 8px;">
                        Confirmar
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

        </tbody>
    </table>
`

export default getHtml
