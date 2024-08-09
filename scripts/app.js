
let footer = true; //true -> footer mobile, false -> footer desktop
let elemTextAreaCxEntradaCripDescr = document.getElementById('txtAreaCxEntradaCripDescr');
let elemTextAreaCxResultCripDescr = document.getElementById('txtAreaCxResultCripDescr');


function principal( tarefa){

    if(tarefa == 'limpaTxtAreaCripDescr'){
        iniciaTxtAreaCrip();
    }
    else if(tarefa == 'criptografar'){

        let msg = document.getElementById('txtAreaCxEntradaCripDescr').value.trim();

        if(msg.length > 0){

            msg = criptografaMsg( msg );
            preparaCxSaidaCripDescr();
            document.getElementById('txtAreaCxResultCripDescr').value = msg;
            
        }

        iniciaTxtAreaCrip();
        ajustaTextArea();

    }
    else if(tarefa == 'descriptografar'){

        let msg = document.getElementById('txtAreaCxEntradaCripDescr').value.trim();

        if(msg.length > 0){

            msg = descriptografaMsg( msg );
            preparaCxSaidaCripDescr();
            document.getElementById('txtAreaCxResultCripDescr').value = msg;
            
        }

        iniciaTxtAreaCrip();
        ajustaTextArea();

    }else if(tarefa == 'copiarClipboard'){

        copiaParaClipboard();
        ajustaTextArea();

    }else if(tarefa == null){
        ajustaTela();
        ajustaTextArea();
    }

}

function iniciaTxtAreaCrip(){

    document.getElementById("txtAreaCxEntradaCripDescr").value="";

}

function validaMsg(){
    
    let elem   = document.getElementById("txtAreaCxEntradaCripDescr");
    elem.value = elem.value.toLowerCase().replace(/[^a-z 0-9 !? " "\n]/g, "");

}

function criptografaMsg( msg ){
    
    let msgCrip = '';

    for( pos = 0 ; pos < msg.length ; pos++ ){

        if(msg[pos] == 'a') 
            msgCrip += 'ai';

        else if(msg[pos] == 'e') 
            msgCrip += 'enter';

        else if(msg[pos] == 'i') 
            msgCrip += 'imes';

        else if(msg[pos] == 'o') 
            msgCrip += 'ober';

        else if(msg[pos] == 'u') 
            msgCrip += 'ufat';

        else
            msgCrip += msg[pos] ;

    }

    return msgCrip;

}

function descriptografaMsg( msg ){

    let msgDescrip = ''; 

    while( msg.length > 0 ){

        if( msg.startsWith('ai') ){         
            msgDescrip += 'a';
            msg = msg.slice(2);
        }
        else if( msg.startsWith('enter') ){
            msgDescrip += 'e';
            msg = msg.slice(5);
        }
        else if( msg.startsWith('imes') ){
            msgDescrip += 'i';
            msg = msg.slice(4);
        }
        else if( msg.startsWith('ober') ){
            msgDescrip += 'o';
            msg = msg.slice(4);
        }
        else if( msg.startsWith('ufat') ){
            msgDescrip += 'u';
            msg = msg.slice(4);
        }
        else{
            msgDescrip += msg[0];
            msg = msg.slice(1);
        }

    }

    return msgDescrip;

}

function preparaCxSaidaCripDescr(){

    document.getElementById("imgCxResultCripDescr").style.display = "none";
    document.getElementById("tituloCxResultCripDescr").style.display = "none";
    document.getElementById("paragCxResultCripDescr").style.display = "none";
    document.getElementById("txtAreaCxResultCripDescr").style.display = "initial";
    document.getElementById("btnCopiarAreaCxResultCripDescr").style.display = "initial";
    document.getElementsByClassName("resultCripDescrip")[0].style.justifyContent="space-between";
    document.getElementsByClassName("resultCripDescrip")[0].style.gap="2rem";

}

function copiaParaClipboard(){

    var textarea = document.getElementById("txtAreaCxResultCripDescr");
    var selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    var textarea = document.getElementById("txtAreaCxResultCripDescr");
            textarea.select();
            textarea.setSelectionRange(0, 99999);

            try {

                var sucesso = document.execCommand('copy');
                document.getElementById("txtAreaCxResultCripDescr").value = "Nenhuma mensagem"; 

            } catch (err) {

                alert('Algo deu errado.');

            }

}

window.addEventListener("resize", ajustaTela);
function ajustaTela(){
    
    if(footer){
        if(window.outerWidth > 800){
            document.getElementsByTagName("footer")[0].style.display = "none";
            document.getElementsByClassName("conteudo")[0].removeChild(document.getElementsByTagName("footer")[0]);
            document.getElementsByClassName("cripDescrip")[0].
            appendChild(document.createElement("footer")).
            appendChild(document.createElement("h6")).
            innerHTML="Desenvolvido por Luciano Ferreira - julho de 2024";
            footer = false;
            
            elemTextAreaCxEntradaCripDescr.removeEventListener('input', textAreaDinamico);
            elemTextAreaCxEntradaCripDescr.style.height = "55vh";

            elemTextAreaCxResultCripDescr.removeEventListener('change', textAreaDinamico);
            elemTextAreaCxResultCripDescr.style.height = "auto";

        } 
    }else{
        if(window.outerWidth <= 800){
            document.getElementsByClassName("cripDescrip")[0].removeChild(document.getElementsByTagName("footer")[0]);
            document.getElementsByClassName("conteudo")[0].
            appendChild(document.createElement("footer")).
            appendChild(document.createElement("h6")).
            innerHTML="Desenvolvido por Luciano Ferreira - julho de 2024";
            footer = true;
            
            elemTextAreaCxEntradaCripDescr.addEventListener('input', textAreaDinamico);

            elemTextAreaCxResultCripDescr.addEventListener('change', textAreaDinamico);

        }
    }
    document.getElementsByTagName("footer")[0].style.display = "block";
}

function textAreaDinamico(){
    elemTextAreaCxEntradaCripDescr.style.height = 'auto';
    elemTextAreaCxEntradaCripDescr.style.height = `${elemTextAreaCxEntradaCripDescr.scrollHeight}px`;

    elemTextAreaCxResultCripDescr.style.height = 'auto';
    elemTextAreaCxResultCripDescr.style.height = `${elemTextAreaCxResultCripDescr.scrollHeight}px`;
}

function ajustaTextArea(){
    if(window.outerWidth <= 800){
        textAreaDinamico();
        elemTextAreaCxEntradaCripDescr.addEventListener('input', textAreaDinamico);
        elemTextAreaCxResultCripDescr.addEventListener('change', textAreaDinamico);
    }
}