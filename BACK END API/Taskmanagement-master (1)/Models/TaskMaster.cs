using System;
using System.Collections.Generic;

namespace Task_app.Models;

public partial class TaskMaster
{
    public int TaskId { get; set; }

    public string? AssignedBy { get; set; }

    public string? AssignedTo { get; set; }

    public DateTime? DateOfAssignment { get; set; }

    public string? Department { get; set; }

    public string? TaskDcr { get; set; }

    public string? TaskName { get; set; }

    public string? TaskProgress { get; set; }

    public string? TaskStatus { get; set; }

    public DateTime? TaskTargetdate { get; set; }
    public int? workstatus { get; set; }
    public string? adminremarks { get; set; }
}
