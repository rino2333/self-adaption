export const getIPs = () => {
  return new Promise<string>((resolve, reject) => {
    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || (window as any).mozRTCPeerConnection
        || (window as any).webkitRTCPeerConnection;
    var useWebKit = !!(window as any).webkitRTCPeerConnection;
 
    //minimal requirements for data connection
    // var mediaConstraints = {
    //     optional: [{RtpDataChannels: true}]
    // };
 
    var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
 
    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers);
 
    function handleCandidate(candidate: string){
      try {
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)![1];
 
        //remove duplicates
        if(ip_addr)
          resolve(ip_addr);
      } catch (error) {
        reject(error)
      }
    }
 
    //listen for candidate events
    pc.onicecandidate = function(ice){
 
        //skip non-candidate events
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };
 
    //create a bogus data channel
    pc.createDataChannel("");
 
    //create an offer sdp
    pc.createOffer(function(result){
 
        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});
 
    }, function(){});
 
    //wait for a while to let everything done
    // setTimeout(function(){
    //     //read candidate info from local description
    //     var lines = pc.localDescription.sdp.split('\n');
 
    //     lines.forEach(function(line){
    //         if(line.indexOf('a=candidate:') === 0)
    //             handleCandidate(line);
    //     });
    // }, 1000);
  })
}