$(document).ready(function () 
{
    update();

    $("select").change(function () 
    {
        update();
    });

	$("input").change(function () 
    {
        update();
    });
});

function update() 
{
	$('.hidden').hide();

    if ($("#device").val() === "pc")
    {
        $("#pc").show();
        if ($("#os").val() === "other")
        {
        	$("#os-other").show();
        }

        var issue = $("#issue").val();
        if (issue === "internet")
        {
        	$("#internet").show();

	   		if ($("#internet-method").val() === "other")
	   		{
	   			$("#internet-method-other").show();
	   		}

	   		var issueSpecific = $("#internet-issue-specific").val();

	   		var internetConnectionIssue = issueSpecific === "no-internet";

	   		if (issueSpecific === "slow")
	   		{
	   			$("#internet-speed").show();

	   			if ($("#current-internet-speed").val() > 0 && $("#expected-internet-speed").val() > 0)
	   			{
	   				$("#solutions").show();
	   				$(".internet-speed-solutions").show();
	   				$(".internet-solutions-restart-internal").show();
	   			}
	   		}
	   		else if (issueSpecific == "partial")
	   		{
	   			$("#partial-internet").show();

	   			var siteStatus = $("#isthissitedown-test").val();

	   			if (siteStatus === "down")
	   			{
	   				$("#solutions").show();
	   				$(".partial-internet-other-site-solution").show();
	   			}
	   			else if (siteStatus === "up")
	   			{
	   				$("#partial-internet-incognito-test").show();

	   				var incognitoTest = $("#incognito-test").val();

	   				if (incognitoTest === "no")
	   				{
	   					internetConnectionIssue = true;
	   				}
	   				else if (incognitoTest === "yes")
	   				{
	   					$("#solutions").show();
	   					$(".partial-internet-cache-solution").show();
	   				}
	   			}

	   		}
	   		else if (issueSpecific === "other")
	   		{
	   			$("#internet-issue-specific-other-reveal").show();
	   		}


	   		if (internetConnectionIssue)
	   		{
	   			$("#internet-connection").show();

	   			if ($("#internet-security").val() === "other")
	   			{
	   				$("#internet-connection-security-other").show();
	   			}

	   			var hotspotTest = $("#hotspot-test").val();

	   			if (hotspotTest === "yes")
	   			{
	   				if ($("#internet-method").val() === "ethernet")
	   				{
	   					$("#solutions").show();
	   					$(".internet-solutions-new-ethernet").show();
	   				}

					$("#internet-router-check").show();
					var routerCheck = $("#router-check").val();

					if (routerCheck === "yes")
					{
						$("#solutions").show();
						$(".internet-solutions-restart-router").show();
					}

	   			}
	   			else if (hotspotTest === "no")
	   			{
					$("#solutions").show();
	   				$(".internet-solutions-restart-internal").show();
	   			}
	   		}
        }
        else if (issue === "other")
        {
        	$("#issue-other").show();
        }
    }
    else if ($("#device").val() === "phone")
    {
    	$("#phone").show();
    }
   	else if ($("#device").val() === "printer")
   	{
   		$("#printer").show();
   	}


		$('.required').prop('required', function(){
	   return  $(this).is(':visible');
	});
}