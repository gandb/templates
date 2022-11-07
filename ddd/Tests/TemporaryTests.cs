﻿namespace Tests;

using Domain;
using Xunit;

public class TemporaryTests
{
    [Fact]
    public void MappingTest()
    {
        SessionFactory.Init(@"Server=(local);Database=Ddd;Trusted_Connection=true");

        var session = SessionFactory.OpenSession();

        var snackMachine = session.Get<SnackMachine>(1L);
    }
}