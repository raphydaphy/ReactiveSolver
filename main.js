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

	var deviceType = $("#device").val();
	var deviceTypeSpecific = null;
	var issue = null;

	if (deviceType === "pc")
	{
		$(".pc-type").show();
		deviceTypeSpecific = $("#pc-os").val();
		if (deviceTypeSpecific !== null)
		{
			$(".issue-types-pc").show();
			issue = $("#pc-issue").val();
		}
		if (deviceTypeSpecific === "other")
	    {
	    	$(".pc-os-other").show();
	    }
	}
	else if (deviceType === "phone")
	{
		$(".phone-type").show();
		deviceTypeSpecific = $("#phone-os").val();
		if (deviceTypeSpecific !== null)
		{
			$(".issue-types-phone").show();
			issue = $("#phone-issue").val();
		}
		if (deviceTypeSpecific === "other")
	    {
	    	$(".phone-os-other").show();
	    }
	}
	else if (deviceType === "printer")
	{
		$(".printer-type").show();
		deviceTypeSpecific = $("#printer-brand").val();
		if (deviceTypeSpecific !== null)
		{
			$(".issue-types-printer").show();
			issue = $("#printer-issue").val();
		}
		if (deviceTypeSpecific === "other")
	    {
	    	$(".printer-brand-other").show();
	    }
	}

	if (deviceTypeSpecific !== null)
	{
		$(".issue-types").show();
	}

    if (issue === "internet")
    {
    	$("#internet").show();

    	var internetMethod = $("#generic-internet-method").val();
    	var internetIssueSpecific = $("#internet-issue-specific-generic").val();

		$(".internet-methods-generic").show();
		$(".internet-issues-generic").show();

    	if (deviceType === "phone")
    	{
    		$(".internet-methods-generic").hide();
    		$(".internet-methods-phone").show();
    		internetMethod = $("#phone-internet-method").val();
    	}
    	else if (deviceType === "printer")
    	{
    		$(".internet-issues-generic").hide();
    		$(".internet-issues-printer").show();
    		internetIssueSpecific = $("#internet-issue-specific-printer").val();
    	}

   		if (internetMethod === "other")
   		{
   			$(".internet-method-other").show();
   		}

   		var internetConnectionIssue = internetIssueSpecific === "no-internet";

   		if (internetIssueSpecific === "slow")
   		{
   			$("#internet-speed").show();

   			if ($("#current-internet-speed").val() > 0 && $("#expected-internet-speed").val() > 0)
   			{
   				$("#solutions").show();
   				$(".internet-speed-solutions").show();
   				$(".internet-solutions-restart-internal").show();
   			}
   		}
   		else if (internetIssueSpecific == "partial")
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
   		else if (internetIssueSpecific === "other")
   		{
   			$(".internet-issue-specific-other").show();
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

   				$("#internet-other-device-check").show();

   				var otherDeviceCheck = $("#other-device-check").val();

   				if (otherDeviceCheck === "yes")
   				{
   					$("#solutions").show();
   					$(".internet-solutions-restart-internal").show();
   					$(".solutions-restart-major").show();

   				}
   				else if (otherDeviceCheck === "no")
   				{
					$("#internet-router-check").show();
					var routerCheck = $("#router-check").val();

					if (routerCheck === "yes")
					{
						$("#solutions").show();
						$(".internet-solutions-restart-router").show();
					}
					else if (routerCheck === "no")
					{
						$("#solutions").show();
						$(".internet-solutions-request-restart").show();
					}
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


	$('.required').prop('required', function(){
	   return  $(this).is(':visible');
	});
}