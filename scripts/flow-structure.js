jsPlumb.ready(function() {
    jsPlumb.Defaults.Container = $(".chart-container");
    
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
    
    
    $(document).ready(function() {
        // Iterate over EVERY SVG Object
        $(".chart-container svg").each(function (i) {
            // Grab the SVG Object Found and Convert its data to a String
            var svg_data = $(this)[0];
            var serializer = new XMLSerializer();
            var str = serializer.serializeToString(svg_data);
            
            // Let's find the destination
            var d = $("#drawingArea");
            
            // Create a canvas element to draw this svg onto
            var c = $(document.createElement("canvas"));
            c.prop("id", "svg"+i);
            c.attr("style", $(this).attr("style"))
            d.append(c);
            canvg("svg"+i, str);
            
            // Remove Original SVG Element
            $(this).remove();
        });
        
        html2canvas($(".chart-container"), {
            onrendered: function (canvas) {
                var img_data = canvas.toDataURL("image/png");
                
                $(".download-container").html("<a href='"+ img_data +"' download>Download Image</a>")
            },
            logging: true,
            profile: true,
            useCORS: true,
            allowTaint: true
        });
    });
});