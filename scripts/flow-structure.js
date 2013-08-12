jsPlumb.ready(function() {
    jsPlumb.Defaults.Container = $("body");
    
    var stateMachineConnector = {				
        connector:"StateMachine",
        paintStyle:{lineWidth:3,strokeStyle:"#000"},
        endpoint:"Blank",
        anchor:"Continuous",
        overlays:[ ["PlainArrow", {location:1, width:15, length:12} ]]
    };
    
    jsPlumb.connect({source: "global-auth", target: "tq-api"}, stateMachineConnector);
    jsPlumb.connect({source: "tq-api", target: "global-auth"}, stateMachineConnector);
    
    jsPlumb.connect({source: "tq-ui", target: "tq-api"}, stateMachineConnector);
    jsPlumb.connect({source: "tq-api", target: "tq-ui"}, stateMachineConnector);

    jsPlumb.connect({source: "data-sources", target: "tq-api"}, stateMachineConnector);
    
    jsPlumb.connect({source: "core-db", target: "core-api"}, stateMachineConnector);
    jsPlumb.connect({source: "core-db", target: "ticket-search"}, stateMachineConnector);
});