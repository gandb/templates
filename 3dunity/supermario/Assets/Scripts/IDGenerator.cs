using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class IDGenerator  
{
    private static long mNextID = 1;

    public static long NextID()
    {
        return mNextID++;
    }
}
