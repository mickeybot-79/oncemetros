
const ResultMessage = ({resultMessage, handleSetResultMessage}) => {

    return (
        <div id="post-result-container" style={{display: resultMessage.display}}>
        <div className="result-container" style={{animation: resultMessage.animation}}>
            <img src={resultMessage.image} alt="" id="post-result-image"/>
            <p id="post-result-message">{resultMessage.message}</p>
            <button className="result-confirm" style={{display: resultMessage.confirmButton}} onClick={() => {
                handleSetResultMessage((resultMessage) => {
                    return {
                        ...resultMessage,
                        display: 'none',
                        confirmButton: 'none'
                    }
                })
            }}>Aceptar</button>
        </div>
    </div>
    )
}

export default ResultMessage