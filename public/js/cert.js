const { web3 } = window
const selectedAddress = web3.eth.defaultAccount  //1~2 현재 엑티브되어있는 메타마스크 계정을 가지고 온다

console.log("selectedAddress: " +selectedAddress); //연결된 계정 확인 로그

$(document).ready(function() {
    const productRegistryContractAddress = '0x6C4dd36B502868A28dDce8807e250Ccf227cB71f'; //스마트컨트랙트 주소
    const productRegistryContractABI = //스마트컨트랙트 ABI 코드
    [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "addressToInfo",
        "outputs": [
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "birth",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "notBefore",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "notAfter",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "certificates",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "certhash",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "caPubkey",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "userPubkey",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "del",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "certhash",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "deleteCert",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getCertInfo",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getCertificate",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hasinfo",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "birth",
            "type": "string"
          }
        ],
        "name": "issue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "setId",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "hash",
            "type": "bytes32"
          }
        ],
        "name": "verification",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "birth",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "nbefore",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nafter",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
          }
        ],
        "name": "verification2",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]


    $('#linkHome').click(function() { showView("viewHome") });
    $('#linkSubmitDocument').click(function() { showView("viewSubmitDocument"); });
    $('#linkVerifyDocument').click(function() { showView("viewVerifyDocument") });
    $('#itemUploadButton').click(itemUploadButton);
    $('#showTableButton').click(showTable);
    $('#deletecertButton').click(deletecertButton);
    $('#documentVerifyButton').click(documentVerifyButton);

	
    $('#contractLink').text(productRegistryContractAddress);
    $('#contractLink').attr('href', 'https://ropsten.etherscan.io/address/' + productRegistryContractAddress);
	    
    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }    
    });
    
    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }
    
    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function(){ $('#infoBox').hide(); });
    }

    function showError(errorMsg) {
        $('#errorBox>p').html("Error: " + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function(){ $('#errorBox').hide(); });
    }

	async function showTable() {

		if (window.ethereum)
			try {
			//	await window.ethereum.enable();
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      } catch (err) {
                return showError("Access to your Ethereum account rejected.");
			}
		if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
		
		let contract = web3.eth.contract(productRegistryContractABI).at(productRegistryContractAddress);

		//$('#myTable').append(  '<table border = "3", width = "100%">' );

	

		contract.getCertificate(function(err, result) {
			if (err)
				return showError("Smart contract call failed: " + err);

			console.log("certificate: " + result);

      let toString = result.toString();
      let strArray = toString.split(",");
      let notBefore = new Date(strArray[3]*1000);
			console.log("notBefore: " + notBefore);
      let notAfter = new Date(strArray[4]*1000);
			console.log("notAfter: " + notAfter);
      console.log("ID: " + strArray[5]);
      $('#myTable').append('<table border = "1", width = "100%"><tr><th rowspan = "6">인증서</th><td>address</td><td>' + strArray[0] + "</td></tr><tr><td>이름</td><td>" + strArray[1] + "</td></tr><tr><td>생년월일</td><td>" + strArray[2] + "</td></tr><tr><td>유효기간(시작)</td><td>" + notBefore  + "</td></tr><tr><td>유효기간(끝)</td><td>" + notAfter + "</td></tr><tr><td>ID</td><td>" + strArray[5] + '</td></tr></table>' );

		}); 


		

 		//$('#myTable').append(  '</table>' );

    }
    
    async function itemUploadButton() {

		if (window.ethereum)
			try {
				await window.ethereum.enable(); //메타마스크와 연결되어있는가
			} catch (err) {
                return showError("Access to your Ethereum account rejected.");
			}
		if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
			
		let account = selectedAddress 
		console.log("my account " , account);
	
		let userName = $("#usname").val();
		console.log("userName " , userName);

		let birth = $("#usbirth").val();
		console.log("userBirth " , birth);
		
		let contract = web3.eth.contract(productRegistryContractABI).at(productRegistryContractAddress);

		contract.issue(userName, birth, function(err, result) {
			if (err)
				return showError("Smart contract call failed: " + err);
			showInfo(`Document ${result} <b>successfully added</b> to the registry.`);
		}); 
		
    }

    async function deletecertButton(){
      if (window.ethereum)
			try {
				await window.ethereum.enable(); //메타마스크와 연결되어있는가
			} catch (err) {
                return showError("Access to your Ethereum account rejected.");
			}
		  if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
		
      let account = selectedAddress 
      console.log("my account " , account);
      let contract = web3.eth.contract(productRegistryContractABI).at(productRegistryContractAddress);

      contract.deleteCert(function(err, result){
        if (err)
				return showError("Smart contract call failed: " + err);
        showInfo(`Document ${result} <b>successfully revoked</b> to the registry.`);
      });
    	
    }

    async function documentVerifyButton() {
      if (window.ethereum)
			try {
				await window.ethereum.enable(); //메타마스크와 연결되어있는가
			} catch (err) {
                return showError("Access to your Ethereum account rejected.");
			}				
		  if (typeof web3 === 'undefined')
                 return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
      let contract = web3.eth.contract(productRegistryContractABI).at(productRegistryContractAddress);
      // let name = $("#usname").val();
  		// let birth = $("#usbirth").val();
      // let notBefore = $("#notBefore").val();
  		// let notAfter = $("#notAfter").val();
      // let id = $("#certId").val();
      let hash = $("#certHash").val();

      //contract.verification2(name,birth,notBefore,notAfter,id,function(err,result){
      contract.verification(hash,function(err,result){
        console.log(result);
        if (err){
          return showError("Smart contract call failed: " + err);
        }
        else if (result == true){
          showInfo(`The certificate you submitted has been validated`);
        }
        else if (result == false){
          showInfo(`The certificate you submitted is not valid`);
        }
      })
  }
});