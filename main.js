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

	if (issue === "crash")
	{
		$(".crash").show();

		var crashIssueSpecific = $("#crash-issue-specific-generic").val();

		if (deviceType === "pc" && deviceTypeSpecific === "windows")
		{
			$(".crash-issues-windows-pc").show();
			crashIssueSpecific = $("#crash-issue-specific-windows-pc").val();

		}
		else
		{
			$(".crash-issues-generic").show();
		}

		/*
		shutdown
		bsod
		program-crash
		major-freeze
		program-freeze
		*/

		var crashFrequencyCheck = $("#crash-frequency-check").val();
		var continueToUnsavedCheck = (crashIssueSpecific ==="shutdown" || crashIssueSpecific === "program-crash" || crashIssueSpecific === "major-freeze" || crashIssueSpecific === "program-freeze");

		if (crashIssueSpecific === "bsod")
		{
			$(".bsod-doing-check").show();
			var bsodDoingCheck = $("#bsod-doing-check").val();

			if (bsodDoingCheck === "normal")
			{
				continueToUnsavedCheck = true;
				if (crashFrequencyCheck === "once" || crashFrequencyCheck === "rare")
				{
					$("#solutions").show();
					$(".bsod-wait-solution").show();
				}
			}
			else if (bsodDoingCheck === "update")
			{

			}
			else if (bsodDoingCheck === "other")
			{
				$(".bsod-doing-check-other").show();
			}
		}

		if (continueToUnsavedCheck)
		{
			$(".crash-issue-unsaved-check").show();
			var crashIssueUnsavedCheck = $("#crash-issue-unsaved-check").val();
			if (crashIssueUnsavedCheck === "critical")
			{

			}
			else if (crashIssueUnsavedCheck === "no" || crashIssueUnsavedCheck === "yes")
			{
				if (crashFrequencyCheck === "once" || crashFrequencyCheck === "rare")
				{
					if (crashIssueSpecific === "program-freeze")
					{
						if (deviceType === "pc")
						{
							$("#solutions").show();
							if (deviceTypeSpecific !== "other")
							{
								$(".program-crash-force-solution-" + deviceTypeSpecific).show();
							}
						}
					}
				}
			}
		}
		if (crashIssueSpecific === "other")
		{
			$(".crash-issue-specific-other").show();
		}
	}
    else if (issue === "internet")
    {
    	$(".internet").show();

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
   		var internetRestartIssue = false;

   		if (internetIssueSpecific === "slow")
   		{
   			$("#internet-speed").show();

   			if ($("#current-internet-speed").val() > 0 && $("#expected-internet-speed").val() > 0)
   			{
   				internetRestartIssue = true;
   				$("#solutions").show();
   				$(".internet-speed-solutions").show();
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

   				internetRestartIssue = true;
   			}
   			else if (hotspotTest === "no")
   			{
				$("#solutions").show();
   				$(".internet-solutions-restart-internal").show();
   			}
   		}
   		if (internetRestartIssue)
   		{
   			$("#internet-other-device-check").show();

			var otherDeviceCheck = $("#other-device-check").val();

   			if (otherDeviceCheck === "no")
   			{
   				$("#solutions").show();
   				$(".internet-solutions-restart-internal").show();
   				$(".solutions-restart-major").show();

   			}
   			else if (otherDeviceCheck === "yes")
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
    }
    else if (issue === "other")
    {
    	$("#issue-other").show();
    }


	$('.required').prop('required', function(){
	   return  $(this).is(':visible');
	});
}